import { Button } from '@mui/material';
import { useSideBarStore } from '../stores';

const Map = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <div>
      Map Page
      <Button onClick={openDrawer( true)}>drawer</Button>
    </div>
  )
}

export default Map