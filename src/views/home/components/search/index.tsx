import React, { ChangeEvent, Component, ReactNode } from 'react'
import { IconWrapper, StyledFlatTextInput, StyledInputWrapper } from '../../../../components/inputs/style'
import { Icon } from '../../../../components/icon'

type TProps = {
  onSearch?: (searchString: string) => void
}

interface ISearchState {
  searchString?: string
}

interface SearchInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <StyledInputWrapper
      bg={'bg.card'}
      borderColor={'transparent'}
      flexDirection={'row-reverse'}
    >
      <StyledFlatTextInput
        defaultValue={props.defaultValue}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        bg={'transparent'}
        borderWidth={0}
        borderRadius={0}
        mt={0}
        flex={'1'}
        px={'lg'}
        py={'md'}
      />
      <IconWrapper pl={'lg'}>
        <Icon glyph={'search'}/>
      </IconWrapper>
    </StyledInputWrapper>
  )
}

class Search extends Component<TProps> {
  state: ISearchState = {}

  render(): ReactNode {
    return (
      <SearchInput placeholder={'Search all items...'} onChange={this._onChangeSearchString}/>
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
