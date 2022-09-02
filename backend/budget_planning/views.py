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
def login(request):
    if request.method == "POST":

        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("content", "")
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
                "user": None
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

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "budget_planning/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "budget_planning/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "budget_planning/register.html")
        

def logout(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))