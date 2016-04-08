//
// Copyright (c) 2013-2016 SKYARCH NETWORKS INC.
//
// This software is released under the MIT License.
//
// http://opensource.org/licenses/mit-license.php
//

module.exports = function(value, index){
  if(index ==='infrastructures') {
    return render_infrastructures(value);
  }else if(index === 'projects') {
    return render_projects(value);
  }else if (index === 'clients') {
    return render_clients(value);
  }else if (index === 'serverspec') {
    return render_serverspecs(value);
  }else if (index === 'dish') {
    return render_dish(value);
  }else if (index === 'cf_template') {
    return render_cf_templates(value);
  }else if (index === 'user_admin') {
    return render_user_admin(value);
  }else if (index === 'serverspec_results') {
    return render_serverspecs_results(value);
  }else if(index === 'operation_sched'){
    return render_ops_sched(value);
  }else{
    return value;
  }
};

function render_infrastructures(value){
  if (value === 'stack_name'){
    return t('infrastructures.stackname');
  }else if(value === 'region'){
    return t('infrastructures.region');
  }else if(value === 'created_at'){
    return t('infrastructures.creation_time');
  }else if(value === 'status'){
    return t('infrastructures.status');
  }else if(value === 'keypairname'){
    return t('infrastructures.keypair');
  }else{
    return value;
  }
}

function render_projects(value){
  if (value === 'code'){
    return t ('projects.code');
  }else if (value === 'name') {
    return t ('projects.name');
  }else if (value === 'cloud_provider') {
    return t ('projects.cloud_provider');
  }else if (value === 'access_key') {
    return t ('projects.access_key');
  }else{
    return value;
  }
}

function render_clients(value){
  if (value === 'code'){
    return t ('clients.code');
  }else if (value === 'name') {
    return t ('clients.name');
  }else{
    return value;
  }
}

function render_serverspecs(value){
  if (value === 'description'){
    return t ('serverspecs.description');
  }else if (value === 'name') {
    return t ('serverspecs.name');
  }else{
    return value;
  }
}

function render_dish(value){
  if (value === 'name'){
    return t ('dishes.name');
  }else if (value === 'detail') {
    return t ('dishes.detail');
  }else if (value === 'status') {
    return t ('dishes.validation_status');
  }else{
    return value;
  }
}

function render_cf_templates(value){
  if (value === 'subject'){
    return t ('cf_templates.subject');
  }else if (value === 'details') {
    return t ('cf_templates.details');
  }else{
    return value;
  }
}

function render_user_admin(value){
  if (value === 'role'){
    return t('users.role');
  }else if (value === 'email') {
    return t('users.email');
  }else if (value === 'last_sign_in_at') {
    return t('users.last_signed_in_at');
  }else{
    return value;
  }
}

function render_serverspecs_results(value){
  if (value === 'serverspec'){
    return t('serverspecs.serverspecs');
  }else if (value === 'resource') {
    return t('serverspecs.generator.resources');
  }else if (value === 'message') {
    return t('cf_templates.details');
  }else if (value === 'status') {
    return t ('infrastructures.status');
  }else if (value === 'created_at') {
    return t ('serverspecs.created_at');
  }else{
    return value;
  }
}

function render_ops_sched(value){
  if (value === 'physical_id'){
    return "Physical ID";
  }else if(value === 'screen_name'){
    return t('operation_scheduler.screen_name');
  }else if(value === 'id'){
    return t ('common.actions');
  }
}
