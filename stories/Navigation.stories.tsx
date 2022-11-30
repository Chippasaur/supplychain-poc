import { Story } from '@storybook/react'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import Navigation, { NavigationActionsProps, NavigationProps } from '../client/components/navigation'

export default {
  title: 'Visibility/Navigation',
  component: Navigation,
  argTypes: {
    avatarUri: {
      defaultValue: null,
      description: 'The avatar on the navigation',
      control: { type: 'text' },
    },
    currentActivePath: {
      defaultValue: '',
      description: 'The active navigation',
      control: { type: 'text' },
    },
  },
}

const navigations: NavigationActionsProps[] = [
  { title: 'Recent', path: 'recent', icon: <RestoreIcon /> },
  { title: 'Favorite', path: 'favorite', icon: <FavoriteIcon /> },
  { title: 'Nearby', path: 'nearby', icon: <LocationOnIcon /> },
]

export const navigationBase: Story<NavigationProps> = args => <Navigation {...args} navigationActions={navigations} />

export const navigationWithLogo = navigationBase.bind({})
navigationWithLogo.args = {
  logo: (
    <img
      src={
        'https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/xqfzqqfqpshnvk1gpcj1'
      }
    />
  ),
}

export const navigationWithAvatar = navigationBase.bind({})
navigationWithAvatar.args = {
  avatarUri: 'https://www.helloasso.com/img/badge-HelloAsso.png',
}
