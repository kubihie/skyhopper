#
# Copyright (c) 2013-2015 SKYARCH NETWORKS INC.
#
# This software is released under the MIT License.
#
# http://opensource.org/licenses/mit-license.php
#

class ServerspecSchedule < ActiveRecord::Base
  include Concerns::Schedule

  belongs_to :resource, foreign_key: 'physical_id', primary_key: 'physical_id'

  @@job_class_name = PeriodicServerspecJob.to_s.freeze

  def job_class_name
    @@job_class_name
  end
end
