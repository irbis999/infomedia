import "jquery-form"

class Page {
  constructor(options) {
    this.elem = options.elem
    this.circleElem = this.elem.find(".circle")
    this.buttonElem = this.elem.find(".button")
    this.formElem = this.elem.find(".form")
    this.bg2 = this.elem.find(".bg.__2")
    this.bg3 = this.elem.find(".bg.__3")
    this.time = 7000
    this.formSent = false

    this.elem.click(e => {
      if ($(e.target).closest(".button:not(.ready)").length) {
        e.preventDefault()
        this.showForm()
      }
    })

    this.elem.click(e => {
      if ($(e.target).closest(".close").length) {
        this.hideForm()
      }
    })

    this.bgGallery()
    setInterval(() => {
      this.bgGallery()
    }, this.time * 3 + 2000)

    //Отправка формы
    this.elem.find("form.wrapper").ajaxForm({
      beforeSubmit: () => !this.formSent,
      success: () => {
        this.formSent = true
        this.formElem.fadeOut(() => {
          this.formElem.remove()
          let thanx = this.elem.find(".thanx")
          thanx.fadeIn(() => thanx.addClass("__form-sent"))
        })
      },
    })
  }

  showForm() {
    this.circleElem.addClass("__active")
    setTimeout(() => {
      this.formElem.fadeIn()
      this.elem.find(".thanx.__form-sent").fadeIn()
    }, 300)
    this.buttonElem
      .addClass("ready")
      .find("span")
      .text(this.buttonElem.data("ready-text"))
  }

  hideForm() {
    this.circleElem.removeClass("__active")
    this.formElem.hide()
    this.elem.find(".thanx.__form-sent").hide()
    this.buttonElem
      .removeClass("ready")
      .find("span")
      .text(this.buttonElem.data("default-text"))
  }

  //Карусель
  bgGallery() {
    setTimeout(() => {
      this.bg2.removeClass("__transparent")
    }, this.time)
    setTimeout(() => {
      this.bg3.removeClass("__transparent")
    }, this.time * 2)
    setTimeout(() => {
      this.bg2.css("display", "none").addClass("__transparent")
      this.bg3.addClass("__transparent")
    }, this.time * 3)
    setTimeout(() => {
      this.bg2
        .css("display", "block")
    }, this.time * 3 + 1500)
  }
}

$(document).ready(() => {
  $("section.main.index").each((index, elem) => {
    new Page({elem: $(elem)})
  })
})