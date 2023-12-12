import { Button } from '@mui/material';
import { useSideBarStore } from '../stores';

const Visitor = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <div>
      Visitor Page
      <Button onClick={openDrawer( true)}>drawer</Button>
    </div>
  )
}

export default Visitor