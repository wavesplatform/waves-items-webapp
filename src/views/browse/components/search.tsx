import React, { ChangeEvent, Component, ReactNode } from 'react'
import { FlatTextInput } from '../../../components/inputs'

type TProps = {
  onSearch?: (searchString: string) => void
}

interface ISearchState {
  searchString?: string
}

class Search extends Component<TProps> {
  state: ISearchState = {}

  render(): ReactNode {
    return (
      <FlatTextInput placeholder={'Search all items...'} onChange={this._onChangeSearchString}/>
    )
  }

  _onChangeSearchString = (ev: ChangeEvent<HTMLInputElement>) => {
    let searchString = ev.target.value
    if (searchString.length < 3) {
      searchString = ''
    }
    // ...

    const { onSearch } = this.props
    onSearch && onSearch(searchString)
  }
}

export default Search
