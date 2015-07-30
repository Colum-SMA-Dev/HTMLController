# media-frameworks-html-controller [![Build Status](https://travis-ci.org/Colum-SMA-Dev/media-frameworks-html-controller.svg?branch=master)](https://travis-ci.org/Colum-SMA-Dev/media-frameworks-html-controller)

A controller that mediates communcations with a [MediaHub](https://github.com/Colum-SMA-Dev/MediaHub) instance for Browser/HTML based clients. 

This handles all of the communications logic between a client and a hub. This module should be extended to incorporate scene display logic. 

## API

### Client Initiated Messages

##### The following api methods are passed through directly to the hub.  Please refer to their documentation in the [MediaHub's API](https://github.com/Colum-SMA-Dev/MediaHub/blob/master/README.md#api)

* [loadScene](https://github.com/Colum-SMA-Dev/MediaHub/blob/master/README.md#loadscene)
* [listScenes](https://github.com/Colum-SMA-Dev/MediaHub/blob/master/README.md#listscenes)
