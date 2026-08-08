from rest_framework import serializers
from .models import Project, Module, Topic

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class ModuleSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(
        source="project.project_name",
        read_only=True
    )

    class Meta:
        model = Module
        fields = "__all__"

class TopicSerializer(serializers.ModelSerializer):
    module_name = serializers.CharField(
        source = "module.module_name",  
        read_only = True
    )

    employee_name = serializers.CharField(
        source="assigned_employee.username",
        read_only=True
    )

    class Meta:
        model = Topic
        fields = "__all__"