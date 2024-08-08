require "test_helper"

class TrainersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trainer = trainers(:one)
  end

  test "should get index" do
    get trainers_url, as: :json
    assert_response :success
  end

  test "should create trainer" do
    assert_difference("Trainer.count") do
      post trainers_url, params: { trainer: { age: @trainer.age, name: @trainer.name, password_digest: @trainer.password_digest, username: @trainer.username } }, as: :json
    end

    assert_response :created
  end

  test "should show trainer" do
    get trainer_url(@trainer), as: :json
    assert_response :success
  end

  test "should update trainer" do
    patch trainer_url(@trainer), params: { trainer: { age: @trainer.age, name: @trainer.name, password_digest: @trainer.password_digest, username: @trainer.username } }, as: :json
    assert_response :success
  end

  test "should destroy trainer" do
    assert_difference("Trainer.count", -1) do
      delete trainer_url(@trainer), as: :json
    end

    assert_response :no_content
  end
end
