#! /usr/bin/env python
# -*- coding: utf-8 -*-


# Create your models here.
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    def __str__(self):
        return self.username

