import * as express from 'express';
import ContentCtrl from './modules/content/content.controller';
import BlockCtrl from './modules/block/block.controller';
import PageCtrl from './modules/page/page.controller';
import MediaCtrl from './modules/media/media.controller';

export function setRoutes(app) {
  const router = express.Router();

  // Contents
  const contentCtrl = new ContentCtrl();
  router.route('/contents').get(contentCtrl.getAll);
  router.route('/contents/count').get(contentCtrl.count);
  router.route('/content').post(contentCtrl.insert);
  router.route('/content/:id').get(contentCtrl.get);
  router.route('/content/:id').put(contentCtrl.update);
  router.route('/content/:id').delete(contentCtrl.delete);
  router.route('/content-by-url').get(contentCtrl.getByUrl);
  router.route('/contents-by-parent/:parentId').get(contentCtrl.getAllByParentId);

  // Pages
  const pageCtrl = new PageCtrl();
  router.route('/page').post(pageCtrl.insert);
  router.route('/page/:id').get(pageCtrl.get);
  router.route('/page/:id').put(pageCtrl.update);
  router.route('/page/get-data').get(pageCtrl.getByUrl);
  router.route('/page/get-children/:parentId').get(pageCtrl.getAllByParentId);

  // Blocks
  const blockCtrl = new BlockCtrl();
  router.route('/blocks').get(blockCtrl.getAll);
  router.route('/block/count').get(blockCtrl.count);
  router.route('/block').post(blockCtrl.insert);
  router.route('/block/:id').get(blockCtrl.get);
  router.route('/block/:id').put(blockCtrl.update);
  router.route('/block/:id').delete(blockCtrl.delete);
  router.route('/block/folders/:parentId?').get(blockCtrl.getFoldersByParentId);
  router.route('/block/get-by-folder/:parentId?').get(blockCtrl.getBlocksByFolder);

  // Media
  const mediaCtrl = new MediaCtrl();
  router.route('/assets/:fileId/:fileName').get(mediaCtrl.getMediaById);
  router.route('/media/upload/:parentId?').post(mediaCtrl.uploadMedia('file'), mediaCtrl.processMedia);
  router.route('/media/folders/:parentId?').get(mediaCtrl.getFoldersByParentId);
  router.route('/media/get-by-folder/:parentId?').get(mediaCtrl.getMediasByFolder);
  router.route('/medias').get(mediaCtrl.getAll);
  router.route('/media').post(mediaCtrl.insert);
  router.route('/media/:id').get(mediaCtrl.get);
  router.route('/media/:id').put(mediaCtrl.update);
  router.route('/media/:id').delete(mediaCtrl.delete);

  // Apply the routes to our application with the prefix /api get-by-folder
  app.use('/api', router);
}
