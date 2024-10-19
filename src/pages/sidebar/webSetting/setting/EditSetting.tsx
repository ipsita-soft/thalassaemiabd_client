import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateSetting, showSetting } from '@/redux/slices/settingSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type EditSettingProps = {
  Id: string;
};

const EditSetting: React.FC<EditSettingProps> = ({ Id }) => {
  const [formData, setFormData] = useState({
    website_title: '',
    slogan: '',
    email: '',
    webmail: '',
    phone: '',
    whatsapp: '',
    telephone: '',
    googlemap: '',
    websitelink: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    copyrighttext: '',
    location: '',
    headerlogo: null as File | null,
    footerlogo: null as File | null,
    favicon: null as File | null,

  });

  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const setting = useSelector((state: RootState) => state.settings.setting);
  const loading = useSelector((state: RootState) => state.settings.isLoading);

  // Fetch the setting data when component mounts
  useEffect(() => {
    if (Id) {
      dispatch(showSetting(Id));
    }
  }, [dispatch, Id]);

  // When setting is fetched, populate the form with the data
  useEffect(() => {
    if (setting) {
      setFormData({
        website_title: setting.website_title || '',
        slogan: setting.slogan || '',
        email: setting.email || '',
        webmail: setting.webmail || '',
        phone: setting.phone || '',
        whatsapp: setting.whatsapp || '',
        telephone: setting.telephone || '',
        googlemap: setting.googlemap || '',
        websitelink: setting.websitelink || '',
        facebook: setting.facebook || '',
        twitter: setting.twitter || '',
        instagram: setting.instagram || '',
        linkedin: setting.linkedin || '',
        youtube: setting.youtube || '',
        copyrighttext: setting.copyrighttext || '',
        location: setting.location || '',
        headerlogo: null,
        footerlogo: null,
        favicon: null,

      });
    }
  }, [setting]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const Data = new FormData();

    Data.append('website_title', formData.website_title);
    Data.append('slogan', formData.slogan);
    Data.append('email', formData.email);
    Data.append('webmail', formData.webmail);
    Data.append('phone', formData.phone);
    Data.append('whatsapp', formData.whatsapp);
    Data.append('telephone', formData.telephone);
    Data.append('googlemap', formData.googlemap);
    Data.append('websitelink', formData.websitelink);
    Data.append('facebook', formData.facebook);
    Data.append('twitter', formData.twitter || '');
    Data.append('instagram', formData.instagram || '');
    Data.append('linkedin', formData.linkedin || '');
    Data.append('youtube', formData.youtube || '');
    Data.append('copyrighttext', formData.copyrighttext);
    Data.append('location', formData.location);

    if (formData.headerlogo) {
      Data.append('headerlogo', formData.headerlogo);
    }
    if (formData.footerlogo) {
      Data.append('footerlogo', formData.footerlogo);
    }
    if (formData.favicon) {
      Data.append('favicon', formData.favicon);
    }


    try {
      await dispatch(updateSetting({ id: Id, data: Data }));

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
      <div className='grid grid-cols-2 gap-2'>
        <div className="">
          <Label htmlFor="website_title">Website Title</Label>
          <Input
            type="text"
            id="website_title"
            value={formData.website_title}
            onChange={(e) => setFormData({ ...formData, website_title: e.target.value })}
            required
          />
        </div>

        <div className="">
          <Label htmlFor="slogan">Slogan</Label>
          <Input
            type="text"
            id="slogan"
            value={formData.slogan}
            onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
            required
          />
        </div>
      </div>




      <div className='grid grid-cols-2 gap-2'>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="webmail">Webmail</Label>
          <Input
            type="email"
            id="webmail"
            value={formData.webmail}
            onChange={(e) => setFormData({ ...formData, webmail: e.target.value })}
            required
          />
        </div>

      </div>

      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            type="text"
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2'>


        <div className="grid gap-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            type="text"
            id="telephone"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="googlemap">Google Map Embed Link</Label>
          <Input
            type="text"
            id="googlemap"
            value={formData.googlemap}
            onChange={(e) => setFormData({ ...formData, googlemap: e.target.value })}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="websitelink">Website Link</Label>
          <Input
            type="text"
            id="websitelink"
            value={formData.websitelink}
            onChange={(e) => setFormData({ ...formData, websitelink: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="facebook">Facebook Link</Label>
          <Input
            type="text"
            id="facebook"
            value={formData.facebook}
            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="twitter">Twitter Link</Label>
          <Input
            type="text"
            id="twitter"
            value={formData.twitter || ''}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="instagram">Instagram Link</Label>
          <Input
            type="text"
            id="instagram"
            value={formData.instagram || ''}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className="grid gap-2">
          <Label htmlFor="linkedin">LinkedIn Link</Label>
          <Input
            type="text"
            id="linkedin"
            value={formData.linkedin || ''}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="youtube">YouTube Link</Label>
          <Input
            type="text"
            id="youtube"
            value={formData.youtube || ''}
            onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
          />
        </div>

      </div>
      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="copyrighttext">Breaking News Text</Label>
          <Input
            type="text"
            id="copyrighttext"
            value={formData.copyrighttext}
            onChange={(e) => setFormData({ ...formData, copyrighttext: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

      </div>
      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="headerlogo">Header Logo</Label>
          <Input
            type="file"
            id="headerlogo"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, headerlogo: e.target.files?.[0] || null })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="footerlogo">Footer Logo</Label>
          <Input
            type="file"
            id="footerlogo"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, footerlogo: e.target.files?.[0] || null })}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>

        <div className="grid gap-2">
          <Label htmlFor="favicon">Favicon</Label>
          <Input
            type="file"
            id="favicon"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, favicon: e.target.files?.[0] || null })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={'Active'}
           
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>







      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? 'Updating...' : 'Update Settings'}
      </Button>
    </form>
  );
};

export default EditSetting;
