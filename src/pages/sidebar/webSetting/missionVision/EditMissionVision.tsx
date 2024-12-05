import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateMissionVision, showMissionVision } from '@/redux/slices/missionVisionSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';

type EditSettingProps = {
  Id: string;
};


const EditMissionVision: React.FC<EditSettingProps> = ({ Id }) => {
  const [formData, setFormData] = useState({
    mission_title: '',
    mission_image: null as File | null,
    mission_description: '',
    vision_title: '',
    vision_image: null as File | null,
    vision_description: '',
  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const setting = useSelector((state: RootState) => state.missionVision.missionVision);
  const loading = useSelector((state: RootState) => state.settings.isLoading);

  // Fetch the setting data when component mounts
  useEffect(() => {
    if (Id) {
      dispatch(showMissionVision(Id));
    }
  }, [dispatch, Id]);

  // Populate form when setting data is fetched
  useEffect(() => {
    if (setting) {
      setFormData({
        mission_title: setting.mission_title || '',
        mission_image: null,
        mission_description: setting.mission_description || '',
        vision_title: setting.vision_title || '',
        vision_image: null,
        vision_description: setting.vision_description || '',

      });
    }
  }, [setting]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();

    Data.append('mtitle', formData.mission_title);
    Data.append('mdescription', formData.mission_description);
    Data.append('vtitle', formData.vision_title);
    Data.append('vdescription', formData.vision_description);

    if (formData.mission_image) {
      Data.append('mimage', formData.mission_image);
    }
    if (formData.vision_image) {
      Data.append('vimage', formData.vision_image);
    }


    try {
      await dispatch(updateMissionVision({ id: Id, data: Data }));

      toast({
        title: 'Success',
        description: 'Settings updated successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
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
        <Label htmlFor="mission_title">Mission Title</Label>
        <Input
          type="text"
          id="mission_title"
          value={formData.mission_title}
          onChange={(e) => setFormData({ ...formData, mission_title: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mission_description">Mission Description</Label>
        {/* <Input
          type="text"
          id="mission_description"
          value={formData.mission_description}
          onChange={(e) => setFormData({ ...formData, mission_description: e.target.value })}
          required
        /> */}


        <div className="mb-2">
          <Label htmlFor="mission_description">Description</Label>
          <ReactQuill
            value={formData.mission_description !== null ? formData.mission_description : ''}
            onChange={(value) => setFormData({ ...formData, mission_description: value })}
            className="react-quill-container "
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="mission_image">Mission Image</Label>
        <Input
          type="file"
          id="mission_image"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, mission_image: e.target.files?.[0] || null })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vision_title">Vision Title</Label>
        <Input
          type="text"
          id="vision_title"
          value={formData.vision_title}
          onChange={(e) => setFormData({ ...formData, vision_title: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vision_description">Vision Description</Label>
     


        <div className="mb-2">
          <Label htmlFor="vision_description">Description</Label>
          <ReactQuill
            value={formData.vision_description !== null ? formData.vision_description : ''}
            onChange={(value) => setFormData({ ...formData, vision_description: value })}
            className="react-quill-container "
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="vision_image">Vision Image</Label>
        <Input
          type="file"
          id="vision_image"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, vision_image: e.target.files?.[0] || null })}
        />
      </div>

      <Button type="submit">Update</Button>
    </form>
  );
};

export default EditMissionVision;
