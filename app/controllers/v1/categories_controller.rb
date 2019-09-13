class V1::CategoriesController < ApplicationController
  def index
    render json: Category.all.to_json
  end
end
