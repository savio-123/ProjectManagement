from django.urls import path
from .views import *

urlpatterns = [
    path("projects/", ProjectListCreateView.as_view()),
    path("projects/<int:id>/", ProjectDetailView.as_view()),
    path("modules/", ModuleListCreateView.as_view()),
    path("modules/<int:id>/", ModuleDetailView.as_view()),
    path("topics/", TopicListCreateView.as_view()),
    path("topics/<int:id>/", TopicDetailView.as_view()),
    path("topics/<int:id>/update/", UpdateTopicStatusView.as_view()),
    path("my-topics/", MyTopicsView.as_view()),
    path("my-modules/", MyModulesView.as_view()),
    path("my-projects/", MyProjectsView.as_view()),
    path("dashboard/admin/", AdminDashboardView.as_view()),
    path("dashboard/admin-graphs/", AdminGraphView.as_view()),
    path("dashboard/employee/", EmployeeDashboardView.as_view()),
    path("dashboard/employee-graphs/", EmployeeGraphView.as_view()),
]