require "test_helper"

class BattlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @battle = battles(:one)
  end

  test "should get index" do
    get battles_url, as: :json
    assert_response :success
  end

  test "should create battle" do
    assert_difference("Battle.count") do
      post battles_url, params: { battle: { location: @battle.location } }, as: :json
    end

    assert_response :created
  end

  test "should show battle" do
    get battle_url(@battle), as: :json
    assert_response :success
  end

  test "should update battle" do
    patch battle_url(@battle), params: { battle: { location: @battle.location } }, as: :json
    assert_response :success
  end

  test "should destroy battle" do
    assert_difference("Battle.count", -1) do
      delete battle_url(@battle), as: :json
    end

    assert_response :no_content
  end
end
