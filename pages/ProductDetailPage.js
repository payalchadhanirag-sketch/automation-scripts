this.firstProduct = page
  .getByRole("link", { name: "Lunettes Penelope" })
  .first();

this.mainImage = page.locator(".swiper-slide-active img").first();

this.thumbnail2 = page
  .locator("#swiper-wrapper-9212afcbdd12b847")
  .getByRole("group", { name: /2/ });

this.thumbnail3 = page
  .locator("#swiper-wrapper-9212afcbdd12b847")
  .getByRole("group", { name: /3/ });

this.thumbnail1 = page
  .locator("#swiper-wrapper-9212afcbdd12b847")
  .getByRole("group", { name: /1/ });

  
async openProduct() {
    await this.page.goto("https://www.direct-optic.fr/lunettes-de-vue");
    await this.firstProduct.click();
}