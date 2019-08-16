import React from 'react';

import navigate_before from "../../../../img/icons/navigate_before.svg";
import navigate_next from "../../../../img/icons/navigate_next.svg";
import './Paginator.css';

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
      currentPage: 0,
      offset: 2
    };
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeCurrentPageByArrow = this.changeCurrentPageByArrow.bind(this);
  }

  componentWillMount() {
    this.setState({
      totalPages: this.props.totalPages,
      currentPage: this.props.currentPage
    })
  }

  changeCurrentPage(e) {
    const {name} = e.target;
    this.setState({...this.state, currentPage: parseInt(name)});
    console.log(this.state)
  }

  changeCurrentPageByArrow(e) {
    const {alt} = e.target;
    alt === "previous" ?
      this.setState({
        ...this.state,
        currentPage: this.state.currentPage - 1
      }) :
      this.setState({
        ...this.state,
        currentPage: this.state.currentPage + 1
      })
  }

  renderPage(pageNumber) {
    return (
      <a className={`paginator-page ${this.state.currentPage === pageNumber ? "paginator-page-selected" : " "}`}
         href="#"
         key={pageNumber}
         onMouseDown={this.changeCurrentPage}>
        {pageNumber}
      </a>
    )
  }

  getMassivePages(offset, currentPage) {
    let middlePages = [];
    let minValue = Math.max(2, currentPage - offset);
    let maxValue = Math.min(currentPage + offset, this.state.totalPages - 1)
    for (let i = minValue; i <= maxValue; i++) {
      middlePages.push(
        this.renderPage(i)
      )
    }
    return middlePages
  }

  getPages() {
    let result = [];
    const {offset, currentPage, totalPages} = this.state;
    //добавляем стрелку "предыдущая страница"
    if (currentPage !== 1) {
      result.push(
        <a href="#"
           className="paginator-arrow"
           onMouseDown={this.changeCurrentPageByArrow}>
          <img src={navigate_before} alt="previous"/>
        </a>
      )
    }
    //добавляем первую страницу
    result.push(
      this.renderPage(1)
    );
    //добавляем "..."
    if (currentPage-offset > 2) {
      result.push(
        <span>...</span>
      )
    }
    //добавляем массив центральных кнопок
    result.push(
      this.getMassivePages(offset, currentPage)
    );
    //добавляем "..."
    if (currentPage+offset < totalPages-1) {
      result.push(
        <span>...</span>
      )
    }
    //добавляем последюю страницу
    result.push(
      this.renderPage(totalPages)
    );
    //добавляем стрелку "следующая страница"
    if (currentPage !== totalPages) {
      result.push(
        <a href="#"
           className="paginator-arrow"
           onMouseDown={this.changeCurrentPageByArrow}>
          <img src={navigate_next} alt="next"/>
        </a>
      )
    }
    return result
  }

  render() {
    return (
      <div className="catalog-content-paginator-box">
        {console.log(this.props)}
        {console.log(this.state)}
        {this.getPages()}

      </div>
    )
  }
}

export default Paginator