import { Button } from '@mui/material';
import { useSideBarStore } from '../stores';

const Stock = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <div>
      Stock Page
      <Button onClick={openDrawer( true)}>drawer</Button>
    </div>
  )
}

export default Stock