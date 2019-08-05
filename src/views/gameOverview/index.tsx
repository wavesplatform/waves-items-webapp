import React, { Component, ReactNode } from 'react'
import { ChildProps, compose, graphql } from 'react-apollo'
import { getGameQuery } from '../../graphql/queries/getGame'
import { GameQuery, GameQueryVariables } from '../../graphql/queries/__generated__/GameQuery'
import { Cover, CoverContent, CoverImageUnderlay, EditButton, GameOverviewContainer, Info, } from './style'
import { Link, Text } from 'rebass'
import { Button } from '../../components/buttons'
import { Redirect } from 'react-router'
import { Loading } from '../../components/loading'
import { GameHeading } from '../../components/game/gameHeading'
import { Icon } from '../../components/icon'
import EditGameModal from '../../components/modals/editGameModal'
import { CoverImage } from '../../components/image/cover'
import withCurrentUser, { WithCurrentUserProps } from '../../components/withCurrentUser'

interface IProps {
  address: string
}

type TData = GameQuery
type TVariables = GameQueryVariables

type TChildProps = ChildProps<IProps, TData, TVariables>

export class GameOverview extends Component<WithCurrentUserProps<TChildProps>> {
  state = {
    editModalShow: false,
  }

  render(): ReactNode {
    const { me } = this.props
    const { user: game, loading, error } = this.props.data!

    if (loading) {
      return <GameOverviewContainer><Loading/></GameOverviewContainer>
    }

    if (!game) {
      return <Redirect to={'/'}/>
    }

    const imagePageUri = game.image && game.image.page
    const editable = me && game.address === me.address

    return (
      <GameOverviewContainer>
        <Cover>
          <CoverImageUnderlay>
            <CoverImage src={imagePageUri}/>
          </CoverImageUnderlay>
          <CoverContent>
            <GameHeading game={game}/>
          </CoverContent>
          {editable && <EditButton onClick={() => {
            this._setShowEditModal(true)
          }}/>}
        </Cover>
        <Info>
          <Text mb={'base'}>{game.totalItems} items</Text>
          <Button
            as={Link}
            href={(game.meta && game.meta.url) ? game.meta.url : '#'}
            target={'_blank'}
            width={'110px'}
          >
            Play
            <Icon variant={'baseline'} glyph={'open_in_new'} ml={'xs'} color={'fades.white.4'}/>
          </Button>
        </Info>
        {editable && <EditGameModal
          game={game}
          show={this.state.editModalShow}
          setShow={this._setShowEditModal}
        />}
      </GameOverviewContainer>
    )
  }

  _setShowEditModal = (value: boolean) => {
    this.setState({
      editModalShow: value,
    })
  }
}

const withGame = graphql<IProps, TData, TVariables>(getGameQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      address: props.address,
    },
  }),
})

export default compose(withGame, withCurrentUser)(GameOverview)
