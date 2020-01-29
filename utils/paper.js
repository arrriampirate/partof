import uniqid from 'uniqid';
import BlankP from "../components/blank/p";
import BlankH1 from "../components/blank/h1";
import BlankH2 from "../components/blank/h2";
import BlankCite from "../components/blank/cite";
import BlankTable from "../components/blank/table";
import BlankObject from "../components/blank/object";
import BlankImage from "../components/blank/image";

export function getComponentByCode(code) {
  switch (code) {
    case 'p':
      return BlankP;
    case 'h1':
      return BlankH1;
    case 'h2':
      return BlankH2;
    case 'cite':
      return BlankCite;
    case 'table':
      return BlankTable;
    case 'object':
      return BlankObject;
    case 'image':
      return BlankImage;
    default:
      return null;
  }
}

export function generateRowColumns(rowId, type) {
  switch (type) {
    case 'full':
      return [{
        width: 'full',
        id: uniqid(),
        sort: 0,
        rowId,
      }];
    case 1:
      return [{
        width: '8-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }];
    case 2:
      return [{
        width: '4-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }, {
        width: '4-8',
        id: uniqid(),
        sort: 1,
        rowId,
      }];
    case 3:
      return [{
        width: '6-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }, {
        width: '2-8',
        id: uniqid(),
        sort: 1,
        rowId,
      }];
    case 4:
      return [{
        width: '1-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }, {
        width: '6-8',
        id: uniqid(),
        sort: 1,
        rowId,
      }, {
        width: '1-8',
        id: uniqid(),
        sort: 2,
        rowId,
      }];
    case 5:
      return [{
        width: '2-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }, {
        width: '4-8',
        id: uniqid(),
        sort: 1,
        rowId,
      }, {
        width: '2-8',
        id: uniqid(),
        sort: 2,
        rowId,
      }];
    case 6:
      return [{
        width: '2-8',
        id: uniqid(),
        sort: 0,
        rowId,
      }, {
        width: '2-8',
        id: uniqid(),
        sort: 1,
        rowId,
      }, {
        width: '2-8',
        id: uniqid(),
        sort: 2,
        rowId,
      }, {
        width: '2-8',
        id: uniqid(),
        sort: 3,
        rowId,
      }];
  }
}

export function getSrcByLink(link) {
  let src = '';
  if (link.includes('youtube.com') || link.includes('youtu.be')) {
    let youtube = link.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtube && youtube[1]) {
      src = `https://www.youtube.com/embed/${youtube[1]}?rel=0&amp;showinfo=0`;
    }
  }

  if (link.includes('coub.com')) {
    let coub = link.split('?')[0];
    coub = coub.replace(/\/$/, '');
    coub = coub.split('/');
    coub = coub[coub.length - 1];
    if (coub) {
      src = `//coub.com/embed/${coub}?muted=false&amp;autostart=false&amp;originalSize=false&amp;startWithHD=true`;
    }
  }

  if (link.includes('rutube.ru')) {
    let rutube = link.split('?')[0];
    rutube = rutube.replace(/\/$/, '');
    rutube = rutube.split('/');
    rutube = rutube[rutube.length - 1];
    if (rutube) {
      src = `//rutube.ru/play/embed/${rutube}?sAuthor=false`;
    }
  }

  if (link.includes('vimeo.com')) {
    let vimeo = link.split('?')[0];
    vimeo = vimeo.replace(/\/$/, '');
    vimeo = vimeo.split('/');
    vimeo = vimeo[vimeo.length - 1];
    if (vimeo) {
      src = `https://player.vimeo.com/video/${vimeo}`;
    }
  }

  return src;
}