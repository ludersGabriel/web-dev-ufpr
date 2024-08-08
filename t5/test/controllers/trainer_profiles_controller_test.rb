require "test_helper"

class TrainerProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trainer_profile = trainer_profiles(:one)
  end

  test "should get index" do
    get trainer_profiles_url, as: :json
    assert_response :success
  end

  test "should create trainer_profile" do
    assert_difference("TrainerProfile.count") do
      post trainer_profiles_url, params: { trainer_profile: { favorite_pokemon: @trainer_profile.favorite_pokemon, hometown: @trainer_profile.hometown, trainer_id: @trainer_profile.trainer_id } }, as: :json
    end

    assert_response :created
  end

  test "should show trainer_profile" do
    get trainer_profile_url(@trainer_profile), as: :json
    assert_response :success
  end

  test "should update trainer_profile" do
    patch trainer_profile_url(@trainer_profile), params: { trainer_profile: { favorite_pokemon: @trainer_profile.favorite_pokemon, hometown: @trainer_profile.hometown, trainer_id: @trainer_profile.trainer_id } }, as: :json
    assert_response :success
  end

  test "should destroy trainer_profile" do
    assert_difference("TrainerProfile.count", -1) do
      delete trainer_profile_url(@trainer_profile), as: :json
    end

    assert_response :no_content
  end
end
