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
    
    sub_name = db.Column(db.String(50) , nullable = False)
        
    category = db.Column(db.Integer , db.ForeignKey('category.id'))

    def __init__ (self , sub_name , category):
        
        self.sub_name = sub_name
        
        self.category = category
    
class Category(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    category_name = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)
        
    services = db.relationship('Services' , backref = 'category')
    
    sub_cat = db.relationship('Subcat' , backref = 'subcat')
    
    def __init__ (self , category_name , color):
        
        self.category_name = category_name
        
        self.color = color

class Services(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    services = db.Column(db.String(50) , nullable = False)
    
    name_cat = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    def __init__ (self , services, name_cat):
        
        self.services = services
        
        self.name_cat = name_cat 
                
class categorySchema(marsh.Schema):
    
    class Meta:
        
        fields = ('id' , 'category_name' , 'color')
        
class servicesSchema(marsh.Schema):
    
    class Meta:
        
        fields = ('id' ,'services' , 'name_cat')
        
cat_sche = categorySchema()

cat_sche = categorySchema(many = True)

services_sche = servicesSchema(many = True)
        
@app.route('/get_data' , methods = ['GET'])
def get_data():
        
    em_list =  []
            
    category_list = Category.query.all()
    
    for i in category_list:
                
        services_list = [j.services for j in i.services]
        
        sub_cat = [k.sub_name for k in i.sub_cat]
        
        id_cat = [m.id for m in i.sub_cat]
                    
        em_list.append({
            
            'id':i.id,
            
            'name':i.category_name,
            
            'color': i.color,
            
            'services': services_list,
            
            'sub_cat': sub_cat,
            
            'id_cat' : id_cat
        })
        
    print(em_list)
                     
    return jsonify(em_list)

@app.route('/Add_Category' , methods = ['POST'])
def add_category():
    
    category_name = request.json['name']
    
    color = request.json['color']
    
    cat_add = Category(category_name , color)
    
    db.session.add(cat_add)
    
    db.session.commit()
        
    return cat_sche.jsonify([cat_add])


@app.route('/Add_Subcat/<int:id>' , methods = ['POST'])
def add_services(id):
    
    sub_name = request.json['name']
    
    subcat_add = Subcat(sub_name , id)
    
    db.session.add(subcat_add)
    
    db.session.commit()
        
    return services_sche.jsonify([subcat_add])
            
################################

if __name__ == '__main__':
    
    app.run(host='127.0.0.1',port=5000 , debug = True)
