require "test_helper"

class Api::V1::TrainersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @new_trainer_params = {
      name: "New Trainer",
      age: 25,
      username: "new_trainer",
      password: "password123",
      role: "user"
    }
  end


  test "should create trainer" do
    assert_difference("Trainer.count") do
      post api_v1_trainers_url, params: { trainer: @new_trainer_params }, as: :json
    end

    assert_response :created
  end

  # test "should show trainer" do
  #   get api_v1_trainer_url(@trainer), as: :json
  #   assert_response :success
  # end

  # test "should update trainer" do
  #   patch api_v1_trainer_url(@trainer), params: { trainer: { name: @trainer.name, age: @trainer.age, username: @trainer.username, password: "newpassword123" } }, as: :json
  #   assert_response :success
  # end

  # test "should destroy trainer" do
  #   assert_difference("Trainer.count", -1) do
  #     delete api_v1_trainer_url(@trainer), as: :json
  #   end

  #   assert_response :no_content
  # end
end
