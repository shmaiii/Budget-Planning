from imp import SEARCH_ERROR
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.db import IntegrityError
from .models import *
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def index(request):
    return HttpResponse("Hello")


@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("password", "")
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({
                "logged_in": True,
                "user": user.serialize(),
                "message": "Logged in as " + request.user.username
            }, safe=False)
        else:
            return JsonResponse({
                "message": "Invalid username and/or password.",
                "logged_in": False,
                "user": None,
                "username": username,
                "password": password
            })
              
    else:
        if request.user.is_authenticated:
            return JsonResponse({
                "logged_in": True,
                "user": request.user.serialize(),
                "message": "Logged in as " + request.user.username
            }, safe=False)
        else:
            return JsonResponse({
                "logged_in": False,
                "user": None,
                "message": "",
            })

@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username", "")
        email = data.get("email", "")

        # Ensure password matches confirmation
        password = data.get("password", "")
        confirmation = data.get("confirmation" "")
        if password != confirmation:
            return JsonResponse({
                "message": "Passwords must match",
                "logged_in": False
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({
                "message": "Username already taken.",
                "logged_in": False
            })
    
    return JsonResponse({
            "message": "",
            "logged_in": False
        })
        

def logout(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))