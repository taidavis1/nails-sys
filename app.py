from dataclasses import field, fields
from email.policy import strict
from pyexpat import model
from select import select
from unicodedata import category
from flask import Flask , redirect , render_template , jsonify, url_for, request , flash
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import UserMixin , AnonymousUserMixin , login_manager , login_user , logout_user
import pymysql
import json
import os
import sys
import random

app = Flask(__name__ , template_folder='templates' , static_folder= 'static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123giadinh@localhost/nailsapp'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

marsh = Marshmallow(app)

db = SQLAlchemy(app)

class Subcat(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    name = db.Column(db.String(50) , nullable = False)
        
    category = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    services = db.relationship('Services' , backref = 'sub_services')

    def __init__ (self , name , category):
        
        self.name = name
        
        self.category = category
            
class Category(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    category_name = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)
        
    services = db.relationship('Services' , backref = 'services')
    
    subCategories = db.relationship('Subcat' , backref = 'subcat')
    
    def __init__ (self , category_name , color):
        
        self.category_name = category_name
        
        self.color = color

class Services(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    name = db.Column(db.String(50) , nullable = False)
    
    display_name = db.Column(db.String(50) , nullable = False)
    
    name = db.Column(db.String(50) , nullable = False)

    price = db.Column(db.Integer , nullable = False)
    
    commision = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)

    photo = db.Column(db.BLOB)

    category = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    subCategories = db.Column(db.Integer , db.ForeignKey('subcat.id'))
    
    def __init__ (self , name, display_name , price , commision , color , photo , category , subCategories):
        
        self.name = name
        
        self.display_name = display_name 
        
        self.price = price
        
        self.commision = commision
        
        self.color = color
        
        self.photo = photo
        
        self.category = category
        
        self.subCategories = subCategories
        
class subcatSchema(marsh.SQLAlchemyAutoSchema):
    
    class Meta:
        
        model = Subcat
        
        load_instance = True
                
class servicesSchema(marsh.SQLAlchemyAutoSchema):
    
    class Meta:
        
        model = Services
        
        load_instance = True

                        
class categorySchema(marsh.SQLAlchemyAutoSchema):
    
    subCategories = marsh.Nested(subcatSchema , many = True)
    
    services = marsh.Nested(servicesSchema , many = True)
    
    class Meta:
        
        model = Category
        
        load_instance = True

        
cat_sche = categorySchema()

cats_sche = categorySchema(many = True)

service_sche = servicesSchema()

services_sche = servicesSchema(many=True)

sub_sche = subcatSchema()

subs_sche = subcatSchema(many=True)
        
@app.route('/get_data' , methods = ['GET'])
def get_data():
                
    category_list = Category.query.all()
            
    all_data = cats_sche.dump(category_list)
        
    return jsonify(all_data)

@app.route('/Add_Category' , methods = ['POST'])
def add_category():
    
    category_name = request.json['name']
    
    color = request.json['color']
    
    cat_add = Category(category_name , color)
    
    db.session.add(cat_add)
    
    db.session.commit()
        
    return cat_sche.jsonify([cat_add])


@app.route('/Add_Subcat/<int:id>' , methods = ['POST'])
def add_subcat(id):
    
    name = request.json['name']
    
    subcat_add = Subcat(name , id)
    
    db.session.add(subcat_add)
    
    db.session.commit()
        
    return subs_sche.jsonify([subcat_add])

@app.route('/Add_Services/<int:category>/<int:subcat>' , methods = ['POST'])

def add_services(category , subcat):
    
    name = request.json['name']
    
    display_name = request.json['displayName']

    commision = request.json['conmission']

    price = request.json['price']

    color = request.json['color']

    photo = request.get_data('photo')
        
    services_add = Services(name, display_name , price , commision , color , photo , category , subcat)
    
    db.session.add(services_add)
    
    db.session.commit()
    
    return services_sche.jsonify([services_add])

            
####################################################

if __name__ == '__main__':
    
    app.run(host='127.0.0.1',port=5000 , debug = True)
