Feature: Product Detail Page

@productDetail @imageGallery
Scenario: Verify product image gallery
  Given user is on a product detail page
  When user clicks on another product thumbnail
  Then main product image should change

  