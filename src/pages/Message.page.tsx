import { Button } from '@mui/material';
import { useSideBarStore } from '../stores';

const Message = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <div>
      Message Page
      <Button onClick={openDrawer( true)}>drawer</Button>
    </div>
  )
}

export default Message