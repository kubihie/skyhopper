#
# Copyright (c) 2013-2016 SKYARCH NETWORKS INC.
#
# This software is released under the MIT License.
#
# http://opensource.org/licenses/mit-license.php
#

class UserPolicy < ApplicationPolicy
  master :index?, :create?, :new?, :update?, :edit?, :destroy?, :sync_zabbix?
end
