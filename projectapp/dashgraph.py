from datetime import date,timedelta
from users.models import User
from .models import Project,  Topic


def employee_completed_topics():

    data = []
    employees = User.objects.filter(role="EMPLOYEE")
    for employee in employees:
        completed = Topic.objects.filter(assigned_employee=employee,status="COMPLETED").count()
        data.append({
            "username": employee.username,
            "completed": completed
        })

    return data

def employee_pending_topics():

    data = []
    employees = User.objects.filter(role="EMPLOYEE")
    for employee in employees:
        pending = Topic.objects.filter(assigned_employee=employee).exclude(status="COMPLETED").count()
        data.append({
            "username": employee.username,
            "pending": pending
        })

    return data

def project_status_distribution():
    data = []
    statuses = [
        "NOT STARTED",
        "IN PROGRESS",
        "COMPLETED",
        "ON HOLD"
    ]
    for status in statuses:
        count = Project.objects.filter(status=status).count()
        data.append({
            "status": status,
            "count": count
        })

    return data

def topic_status_distribution():

    data = []
    statuses = [
        "TODO",
        "IN PROGRESS",
        "COMPLETED"
    ]
    for status in statuses:
        count = Topic.objects.filter(status=status).count()
        data.append({
            "status": status,
            "count": count
        })

    return data

def priority_wise_topics():

    data = []
    priorities = [
        "LOW",
        "MEDIUM",
        "HIGH"
    ]
    for priority in priorities:
        count = Topic.objects.filter(priority=priority).count()
        data.append({
            "priority": priority,
            "count": count
        })

    return data

def personal_task_status(employee):

    data = []
    statuses = [
        "TODO",
        "IN PROGRESS",
        "COMPLETED"
    ]
    for status in statuses:
        count = Topic.objects.filter(assigned_employee=employee,status=status).count()
        data.append({
            "status": status,
            "count": count
        })

    return data

def priority_wise_assigned_topics(employee):

    data = []
    priorities = [
        "LOW",
        "MEDIUM",
        "HIGH"
    ]
    for priority in priorities:
        count = Topic.objects.filter(assigned_employee=employee,priority=priority).count()
        data.append({
            "priority": priority,
            "count": count
        })

    return data

def weekly_progress(employee):

    data = []
    today = date.today()

    for i in range(7):
        day = today - timedelta(days=i)
        count = Topic.objects.filter(
            assigned_employee=employee,
            status="COMPLETED",
            due_date=day
        ).count()

        data.append({
            "day": str(day),
            "completed": count
        })

    return data

def monthly_completed_topics(employee):

    data = []

    for month in range(1,13):
        count = Topic.objects.filter(
            assigned_employee=employee,
            status="COMPLETED",
            due_date__month=month,
            due_date__year=date.today().year
        ).count()

        data.append({
            "month": month,
            "completed": count
        })

    return data