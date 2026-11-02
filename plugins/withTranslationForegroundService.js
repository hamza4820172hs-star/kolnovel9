const { withAndroidManifest } = require('@expo/config-plugins');
module.exports = function withTranslationForegroundService(config) {
 return withAndroidManifest(config, config => {
  const manifest=config.modResults.manifest;
  const permissions=manifest['uses-permission']||[];
  const addPermission=name=>{if(!permissions.some(p=>p.$?.['android:name']===name))permissions.push({$:{'android:name':name}});};
  addPermission('android.permission.FOREGROUND_SERVICE');
  addPermission('android.permission.FOREGROUND_SERVICE_DATA_SYNC');
  addPermission('android.permission.POST_NOTIFICATIONS');
  manifest['uses-permission']=permissions;
  const app=manifest.application?.[0];
  if(app){
   app.service=app.service||[];
   const serviceName='com.asterinet.react.bgactions.RNBackgroundActionsTask';
   let service=app.service.find(s=>s.$?.['android:name']===serviceName);
   if(!service){service={$:{'android:name':serviceName}};app.service.push(service);}
   service.$['android:foregroundServiceType']='dataSync';
   service.$['android:exported']='false';
  }
  return config;
 });
};
