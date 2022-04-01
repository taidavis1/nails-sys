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

# class Subcat(db.Model):
    
#     id = db.Column(db.Integer , primary_key = True)
    
#     sub_name = db.Column(db.String(50) , nullable = False)
    
#     color = db.Column(db.String(50) , nullable = False)

#     category = db.relationship('Category' , backref = 'category')
    
#     services = db.relationship('Services' , backref = 'services')
    
#     def __init__ (self , )
    
class Category(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    category_name = db.Column(db.String(50) , nullable = False)
    
    color = db.Column(db.String(50) , nullable = False)
    
    # subcategories = db.Column(db.Integer , db.ForeignKey('subcat.id'))
    
    services = db.relationship('Services' , backref = 'category')
    
    def __init__ (self , category_name , color):
        
        self.category_name = category_name
        
        self.color = color

class Services(db.Model):
    
    id = db.Column(db.Integer , primary_key = True)
    
    services = db.Column(db.String(50) , nullable = False)
    
    name_cat = db.Column(db.Integer , db.ForeignKey('category.id'))
    
    def __init__ (self , services, category):
        
        self.services = services
        
        self.category = category
                
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
                
        em_list.append({
            
            'id':i.id,
            
            'name':i.category_name,
            
            'color': i.color,
            
            'services': services_list
        })
                     
    return jsonify(em_list)

@app.route('/Add_Category' , methods = ['POST'])
def add_category():
    category_name = request.json['name']
    
    color = request.json['color']
    
    cat_add = Category(category_name , color)
    
    db.session.add(cat_add)
    
    db.session.commit()
    
    print(cat_sche.jsonify(cat_add))
    
    return cat_sche.jsonify(cat_add)
    

# @app.route('/get_data_services/<int:id>' , methods = ['GET'])
# def get_data_services(id):
    
#     services = Product.query.filter_by(cat_id = id).all()
    
#     list_json = pro_sche.dump(services)
    
#     print(list_json)
    
#     return jsonify(list_json)
            
################################

if __name__ == '__main__':
    
    app.run(host='127.0.0.1',port=5000 , debug = True)
