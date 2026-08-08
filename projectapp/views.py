from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from datetime import date
from users.models import User
from .dashgraph import *
from .models import Project,Module,Topic
from .serializers import ProjectSerializer,ModuleSerializer,TopicSerializer

class ProjectListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        return get_object_or_404(Project, id=id)
    
    def get(self, request, id):

        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        project = self.get_object(id)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    
    def put(self, request, id):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        project = self.get_object(id)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        project = self.get_object(id)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ModuleListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        modules = Module.objects.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)

    def post(self, request):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ModuleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        return get_object_or_404(Module, id=id)

    def patch(self, request, id):

        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        module = self.get_object(id)
        module.status = request.data.get("status", module.status)
        module.save()
        return Response({"message": "Module status updated"})

    def delete(self, request, id):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        module = self.get_object(id)
        module.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    

class TopicListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TopicDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        return get_object_or_404(Topic, id=id)
    
    def get(self, request, id):
        if request.user.role != "ADMIN":
            return Response(
                {"message": "Permission Denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        topic = self.get_object(id)
        serializer = TopicSerializer(topic)

        return Response(serializer.data)

    def put(self, request, id):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        topic = self.get_object(id)
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        
        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        topic = self.get_object(id)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    

class MyTopicsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        topics = Topic.objects.filter(assigned_employee=request.user)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)    

class MyModulesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)

        modules = Module.objects.filter(topic__assigned_employee=request.user).distinct()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)    

class MyProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)

        projects = Project.objects.filter(module__topic__assigned_employee=request.user).distinct()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)    
    

class UpdateTopicStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        topic = get_object_or_404(Topic,id=id,assigned_employee=request.user)
        serializer = TopicSerializer(topic,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        data = {
            "total_employees": User.objects.filter(role="EMPLOYEE").count(),
            "total_projects": Project.objects.count()   ,
            "total_modules": Module.objects.count(),
            "total_topics": Topic.objects.count(),
            "completed_topics": Topic.objects.filter(status="COMPLETED").count(),
            "pending_topics": Topic.objects.exclude(status="COMPLETED").count(),
            "overdue_topics": Topic.objects.filter(due_date__lt=date.today()).exclude(status="COMPLETED").count(),
            }   
        return Response(data)    
    
class AdminGraphView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        
        data = {
            "employee_completed_topics": employee_completed_topics(),
            "employee_pending_topics": employee_pending_topics(),
            "project_status_distribution": project_status_distribution(),
            "topic_status_distribution": topic_status_distribution(),
            "priority_wise_topics": priority_wise_topics(),
        }

        return Response(data)    
    
class EmployeeDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)

        topics = Topic.objects.filter(
            assigned_employee=request.user
        )

        data = {
            "assigned_projects": Project.objects.filter(module__topic__assigned_employee=request.user).distinct().count(),
            "assigned_modules": Module.objects.filter(topic__assigned_employee=request.user).distinct().count(),
            "assigned_topics": topics.count(),
            "completed_topics": topics.filter(status="COMPLETED").count(),
            "pending_topics": topics.exclude(status="COMPLETED").count(),
            "overdue_topics": topics.filter(due_date__lt=date.today()).exclude(status="COMPLETED").count(),
        }
        return Response(data)    
    
class EmployeeGraphView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "EMPLOYEE":
            return Response({"message": "Permission Denied"},status=status.HTTP_403_FORBIDDEN)
        data = {
                "task_status": personal_task_status(request.user),
                "priority_wise_topics": priority_wise_assigned_topics(request.user),
                "weekly_progress": weekly_progress(request.user),
                "monthly_completed_topics": monthly_completed_topics(request.user),
                }

        return Response(data)    