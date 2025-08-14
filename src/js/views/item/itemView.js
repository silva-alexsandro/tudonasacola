export class ItemView {
  constructor() {
    this.containerCards = $('#wrapperItem')
  }


  render() {
    this.containerCards.append(`<h2>ok chamada de render item</h2>`)
  }

}