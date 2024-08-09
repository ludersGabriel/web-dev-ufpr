require "test_helper"

class Api::V1::PokemonBattlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pokemon_battle = pokemon_battles(:one)
  end

  test "should get index" do
    get pokemon_battles_url, as: :json
    assert_response :success
  end

  test "should create pokemon_battle" do
    assert_difference("PokemonBattle.count") do
      post pokemon_battles_url, params: { pokemon_battle: { battle_id: @pokemon_battle.battle_id, pokemon_id: @pokemon_battle.pokemon_id } }, as: :json
    end

    assert_response :created
  end

  test "should show pokemon_battle" do
    get pokemon_battle_url(@pokemon_battle), as: :json
    assert_response :success
  end

  test "should update pokemon_battle" do
    patch pokemon_battle_url(@pokemon_battle), params: { pokemon_battle: { battle_id: @pokemon_battle.battle_id, pokemon_id: @pokemon_battle.pokemon_id } }, as: :json
    assert_response :success
  end

  test "should destroy pokemon_battle" do
    assert_difference("PokemonBattle.count", -1) do
      delete pokemon_battle_url(@pokemon_battle), as: :json
    end

    assert_response :no_content
  end
end
