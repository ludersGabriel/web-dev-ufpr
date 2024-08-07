require "test_helper"

class Api::V1::PokemonsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pokemon = pokemons(:one)
  end

  test "should get index" do
    get pokemons_url, as: :json
    assert_response :success
  end

  test "should create pokemon" do
    assert_difference("Pokemon.count") do
      post pokemons_url, params: { pokemon: { level: @pokemon.level, name: @pokemon.name, poke_type: @pokemon.poke_type, trainer_id: @pokemon.trainer_id } }, as: :json
    end

    assert_response :created
  end

  test "should show pokemon" do
    get pokemon_url(@pokemon), as: :json
    assert_response :success
  end

  test "should update pokemon" do
    patch pokemon_url(@pokemon), params: { pokemon: { level: @pokemon.level, name: @pokemon.name, poke_type: @pokemon.poke_type, trainer_id: @pokemon.trainer_id } }, as: :json
    assert_response :success
  end

  test "should destroy pokemon" do
    assert_difference("Pokemon.count", -1) do
      delete pokemon_url(@pokemon), as: :json
    end

    assert_response :no_content
  end
end
