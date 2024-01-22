import { useDialogStore } from '../stores';
import { DialogType } from '../stores/useDialogStore';


export const useDialog = () => {
  const {
    setType,
    setTitle,
    setDescription,
    setRevealed,
    responseHandler,
    setResponseHandler,
  } = useDialogStore();

  const onInteractionEnd = (value: string | boolean) => {
    setRevealed(false);
    responseHandler?.(value);
    setTitle('');
    setDescription('');
  };

  const setAttributes = (type: DialogType, title: string, description: string) => {
    setRevealed(true);
    setType(type);
    setTitle(title);
    setDescription(description);
  };

  const confirm = (title: string, description = '') => {
    setAttributes('confirm', title, description);

    return new Promise<string | boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const alert = (title: string, description = '') => {
    setAttributes('alert', title, description);

    return new Promise<string | boolean>((res) => {
      setResponseHandler(res);
    });
  };

  const prompt = (title: string, description = '') => {
    setAttributes('prompt', title, description);

    return new Promise<string | boolean>((res) => {
      setResponseHandler(res);
    });
  };

  return {
    onInteractionEnd,
    confirm,
    alert,
    prompt,
  };
};