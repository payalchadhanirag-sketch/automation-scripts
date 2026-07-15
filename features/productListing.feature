Feature: Product Listing Page Filters

@productListing @filterGender
  Scenario Outline: Filter products by gender
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Genre" filter option "<gender>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | gender |
      | Femme  |
      | Homme  |
      | Mixte  |

  @productListing @filterShape
  Scenario Outline: Filter products by frame shape
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Forme de la monture" filter option "<shape>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | shape   |
      | Ovale   |
      | Ronde   |
      | Carrée  |

  @productListing @filterBrand
  Scenario Outline: Filter products by brand
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Marque" filter option "<brand>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | brand    |
      | Carrera  |
      | Ray-Ban  |

  @productListing @filterPrice
  Scenario Outline: Filter products by price range
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user sets price range from "<minPrice>" to "<maxPrice>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | minPrice | maxPrice |
      | 90       | 99       |
      | 50       | 150      |