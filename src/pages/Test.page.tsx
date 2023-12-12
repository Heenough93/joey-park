import { Button } from '@mui/material';
import { useSideBarStore } from '../stores';

const Test = () => {
  //
  const { openDrawer } = useSideBarStore();

  return (
    <div>
      Test Page
      <Button onClick={openDrawer( true)}>drawer</Button>
    </div>
  )
}

export default Test