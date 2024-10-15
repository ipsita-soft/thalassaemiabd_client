import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateBtsHistory, showBtsHistory } from '@/redux/slices/btsHistorySlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

type EditSettingProps = {
  Id: string;
};

const EditBtsHistory: React.FC<EditSettingProps> = ({ Id }) => {
  const [formData, setFormData] = useState({
    mtitle: '',
    mimage: null as File | null,
    mdescription: '',
    vtitle: '',
    vimage: null as File | null,
    vdescription: '',
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const setting = useSelector((state: RootState) => state.btsHistory.BtsHistory);
  const loading = useSelector((state: RootState) => state.btsHistory.isLoading);

  // Fetch the setting data when component mounts
  useEffect(() => {
    if (Id) {
      dispatch(showBtsHistory(Id));
    }
  }, [dispatch, Id]);

  // Populate form when setting data is fetched
  useEffect(() => {
    if (setting) {
      setFormData({
        mtitle: setting.mtitle || '',
        mimage: null,
        mdescription: setting.mdescription || '',
        vtitle: setting.vtitle || '',
        vimage: null,
        vdescription: setting.vdescription || '',
      });
    }
  }, [setting]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();

    Data.append('mtitle', formData.mtitle);
    Data.append('mdescription', formData.mdescription);
    Data.append('vtitle', formData.vtitle);
    Data.append('vdescription', formData.vdescription);

    if (formData.mimage) {
      Data.append('mimage', formData.mimage);
    }
    if (formData.vimage) {
      Data.append('vimage', formData.vimage);
    }

    try {
      await dispatch(updateBtsHistory({ id: Id, data: Data }));

      toast({
        title: 'Success',
        description: 'Data updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update Data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading indicator while fetching data
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="mtitle">Title One</Label>
        <Input
          type="text"
          id="mtitle"
          value={formData.mtitle}
          onChange={(e) => setFormData({ ...formData, mtitle: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mdescription">Description One</Label>
        <ReactQuill
          value={formData.mdescription}
          onChange={(value) => setFormData({ ...formData, mdescription: value })}
          
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mimage">Image One</Label>
        <Input
          type="file"
          id="mimage"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, mimage: e.target.files?.[0] || null })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vtitle">Title Two</Label>
        <Input
          type="text"
          id="vtitle"
          value={formData.vtitle}
          onChange={(e) => setFormData({ ...formData, vtitle: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vdescription">Description Two</Label>
        <ReactQuill
          value={formData.vdescription}
          onChange={(value) => setFormData({ ...formData, vdescription: value })}
          
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vimage">Image Two</Label>
        <Input
          type="file"
          id="vimage"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, vimage: e.target.files?.[0] || null })}
        />
      </div>

      <Button type="submit">Update</Button>
    </form>
  );
};

export default EditBtsHistory;
