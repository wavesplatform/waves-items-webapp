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
import { config } from '../../../config/config'
import { Mutation, MutationFn } from 'react-apollo'
import { UpdateGameInfo, UpdateGameInfoVariables } from '../../../graphql/mutations/__generated__/UpdateGameInfo'
import { updateGameInfoMutation } from '../../../graphql/mutations/updateGameInfo'

const Modal = require('react-modal')
Modal.setAppElement('#root')

class UpdateGameInfoMutation extends Mutation<UpdateGameInfo, UpdateGameInfoVariables> {
}

interface IProps extends IModalProps {
  game: IGame
}

interface IState extends UserImage, GameMeta {
  isLoading: boolean
  name: string
  // Files
  iconFile: any
  pageFile: any
}

class EditGameModal extends Component<IProps> {
  state: IState = {
    isLoading: false,
    name: '',
    description: '',
    url: '',
    icon: '',
    page: '',
    // Files
    iconFile: null,
    pageFile: null,
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
          <UpdateGameInfoMutation
            mutation={updateGameInfoMutation}
            onCompleted={this._handleCompleted}
            onError={err => {
              console.log(err)

              this.setState({
                isLoading: false,
              })
            }}
          >
            {(updateGameinfo, { loading, error }) => {
              return (
                <Form onSubmit={ev => this._handleSubmit(ev, updateGameinfo)}>
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
                    <Button type='submit' variant={'primary'} width={1} size={'lg'} disabled={this.state.isLoading}>
                      {this.state.isLoading ? 'Loading...' : 'Save'}
                    </Button>
                  </Actions>
                </Form>
              )
            }}
          </UpdateGameInfoMutation>
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
    const reader = new FileReader()
    const file = ev.target.files && ev.target.files[0]

    if (!file) {
      return
    }

    if (file.size > config.images.pageMaxImageSizeByte) {
      // TODO: show error
      return
    }

    reader.onloadend = () => {
      this.setState({
        pageFile: file,
        page: reader.result,
      })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  _changeAvatar = (ev: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const file = ev.target.files && ev.target.files[0]

    if (!file) {
      return
    }

    if (file.size > config.images.iconMaxImageSizeByte) {
      // TODO: show error
      return
    }

    reader.onloadend = () => {
      this.setState({
        iconFile: file,
        icon: reader.result,
      })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  _handleSubmit = async (ev: FormEvent, updateGameInfo: MutationFn<UpdateGameInfo, UpdateGameInfoVariables>) => {
    ev.preventDefault()
    const { show, setShow } = this.props
    const { name, url, description, iconFile, pageFile } = this.state

    this.setState({
      isLoading: true,
    })

    try {
      await updateGameInfo({
        variables: {
          input: {
            name,
            url,
            description,
            pageFile,
            iconFile,
          },
        },
      })

      // User on store will be updated

      this.setState({
        pageFile: null,
        iconFile: null,
      })
    } catch (err) {
      throw err
    }

    // setShow(false)
  }

  _handleCompleted = () => {
    this.setState({
      isLoading: false,
    })
  }
}

export default EditGameModal
