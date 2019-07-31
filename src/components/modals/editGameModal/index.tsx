import React, { ChangeEvent, Component, FormEvent, ReactNode } from 'react'
import { ModalContainer } from '../container'
import { modalStyles } from '../style'
import { Button } from '../../buttons'
import { Actions, Form } from '../../globals'
import { AvatarInput, CoverInput, TextArea, TextInput } from '../../inputs'
import { IModalProps } from '../index'
import { GameMeta, IGame, UserImage } from '../../../types'
import { Cover, CoverContent, CoverImageUnderlay } from './style'
import { generateAvatar } from '../../../helpers/user'

const Modal = require('react-modal')
Modal.setAppElement('#root')

interface IProps extends IModalProps {
  game: IGame
}

interface IState extends UserImage, GameMeta {
  name: string
}

class EditGameModal extends Component<IProps> {
  state: IState = {
    name: '',
    description: '',
    url: '',
    icon: '',
    page: '',
  }

  constructor(props: IProps) {
    super(props)

    const { game } = props

    this.state.name = game.name || ''
    if (game.meta) {
      this.state.description = game.meta.description
      this.state.url = game.meta.url
    }
    if (game.image) {
      this.state.page = game.image.page
    }

    if (game.image && game.image.icon) {
      this.state.icon = game.image.icon
    } else {
      this.state.icon = generateAvatar(game.address)
    }
  }

  render(): ReactNode {
    const { show, setShow, game } = this.props
    const styles = modalStyles(420)

    return (
      <Modal
        isOpen={show}
        onRequestClose={() => {
          setShow(false)
        }}
        style={styles}
      >
        <ModalContainer
          title={'Game Settings'}
          ignoreHeader={true}
          onClose={() => {
            setShow(false)
          }}
        >
          <Form onSubmit={ev => this._handleSubmit(ev)}>
            <Cover>
              <CoverImageUnderlay>
                <CoverInput defaultValue={this.state.page} onChange={this._changeCover}/>
              </CoverImageUnderlay>
              <CoverContent>
                <AvatarInput defaultValue={this.state.icon} onChange={this._changeAvatar}/>
              </CoverContent>
            </Cover>
            <TextInput value={this.state.name}
                       onChange={this._changeName}
                       placeholder={'The game name'}
            >Name</TextInput>
            <TextInput value={this.state.url}
                       onChange={this._changeUrl}
                       placeholder={'External URL of your game'}
            >Game URL</TextInput>
            <TextArea value={this.state.description}
                      onChange={this._changeDescription}
                      placeholder={'The description of your game'}
                      rows={3}
            >Description</TextArea>
            <Actions>
              <Button type='submit' variant={'primary'} width={1} size={'lg'}>Save</Button>
            </Actions>
          </Form>
        </ModalContainer>
      </Modal>
    )
  }

  _changeName = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.value

    this.setState({
      name,
    })
  }

  _changeDescription = (ev: ChangeEvent<HTMLInputElement>) => {
    const description = ev.target.value

    this.setState({
      description,
    })
  }

  _changeUrl = (ev: ChangeEvent<HTMLInputElement>) => {
    const url = ev.target.value

    this.setState({
      url,
    })
  }

  _changeCover = (ev: ChangeEvent<HTMLInputElement>) => {
    const cover = ev.target.value
    console.log(cover)
  }

  _changeAvatar = (ev: ChangeEvent<HTMLInputElement>) => {
    const avatar = ev.target.value
    console.log(avatar)
  }

  _handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const { show, setShow } = this.props

    await this._confirm()

    setShow(false)
  }

  _confirm = async () => {
    console.log(this.state)
  }
}

export default EditGameModal
