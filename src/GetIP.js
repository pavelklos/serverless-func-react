import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = '/api/get-ip';

const GetIP = () => {
  const [serverIp, setServerIp] = useState('');
  const [clientIpData, setClientIpData] = useState('');

  // Client IP
  const getIpInfo = async () => {
    await axios
      .get('http://ip-api.com/json')
      .then((response) => {
        let data = response.data || {};
        setClientIpData(data);
      })
      .catch((err) => {});
  };

  // Server IP
  const fetchIp = async () => {
    try {
      const response = await axios.get(url);
      const { data } = response;
      // console.log(response);
      setServerIp(data);
    } catch (error) {}
  };

  useEffect(() => {
    getIpInfo();
    fetchIp();
  }, []); // ON INITIAL RENDER

  return (
    <section className='section section-center'>
      <div className='title'>
        <h2>
          server IP <small>(client IP)</small>
        </h2>
        <h4>(from own server - netlify serverless function)</h4>
        <div className='title-underline'></div>
        <br />
        <h3 className='server-ip'>server IP</h3>
        <br />
        <h1 className='server-ip'>{serverIp}</h1>
        <br />
        <h3 className='client-ip'>client IP</h3>
        <br />
        <h3 className='client-ip'>{clientIpData.query}</h3>
        <h3 className='client-ip'>{clientIpData.city}</h3>
        <br />
        <h4 className='client-ip'>
          {clientIpData.countryCode} : {clientIpData.country}
        </h4>
        <br />
        <h4 className='client-ip'>
          {clientIpData.lat} - {clientIpData.lon}
        </h4>
      </div>
    </section>
  );
};

export default GetIP;

// const { data: ip } = await axios.get('http://ipv4bot.whatismyipaddress.com/'); // ISSUE CORS
// const { data: ip } = await axios.get('https://checkip.amazonaws.com/'); // ISSUE CORS
// const response2 = await axios.get('http://ip-api.com/json');
// https://gist.github.com/ibraAbuKaff/0f5ad56c3a8c287639aecc7802f38603
