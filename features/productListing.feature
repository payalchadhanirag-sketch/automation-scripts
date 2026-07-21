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
      | Homme  |

  @productListing @filterShape
  Scenario Outline: Filter products by frame shape
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Forme de la monture" filter option "<shape>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | shape   |
      | Carrée  |

  @productListing @filterBrand
  Scenario Outline: Filter products by brand
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Marque" filter option "<brand>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      |brand |
      | Direct Optic |

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

 @productListing @filterCharacteristics
  Scenario Outline: Filter products by general characteristics
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Caractéristiques générales" filter option "<characteristic>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | characteristic  |
      | Avec clip solaire |


  @productListing @filterColor
  Scenario Outline: Filter products by color
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Couleur" filter option "<color>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | color  |
      | Argent |


  @productListing @filterMaterial
  Scenario Outline: Filter products by material
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user selects "Matière" filter option "<material>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | material |
      | Acétate  |

 @productListing @filterLensWidth
Scenario Outline: Filter products by lens width
  Given user is on the "Lunettes de vue" listing page
  When user opens all filters panel
  And user sets "Largeur du verre" slider range from "<minWidth>" to "<maxWidth>"
  And user applies the selected filters
  Then filtered products should be displayed

Examples:
  | minWidth | maxWidth |
  | 44       | 58       |

  @productListing @filterTotalWidth
  Scenario Outline: Filter products by total frame width
    Given user is on the "Lunettes de vue" listing page
    When user opens all filters panel
    And user sets "Largeur totale" slider range from "<minWidth>" to "<maxWidth>"
    And user applies the selected filters
    Then filtered products should be displayed

    Examples:
      | minWidth | maxWidth |
      | 128      | 142      |