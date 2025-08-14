export class DetailView {
  constructor() { }
  renderNameList(name) {
    $('#navbar__left h2').append(`${name}`)
  }
}