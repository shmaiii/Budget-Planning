from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    #api 
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout, name="logout"),
    path("user_info/<int:user_id>", views.user_info, name="user_info")
]
