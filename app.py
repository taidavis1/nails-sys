from flask import Flask , redirect , render_template , jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin , AnonymousUserMixin , login_manager , login_user , logout_user
import json
import os
import sys
import random


############################
