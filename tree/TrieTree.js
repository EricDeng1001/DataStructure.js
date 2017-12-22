class Node {
  constructor( charA ){
    this.character = charA;
    this.count = 1;
    this.children = [];
  }
  appendChild( child ){
    this.children.push( child );
    return child;
  }
  removeChild( child ){
    this.children = this.children.filter( c => c !== child );
  }
};
class TrieTree {
  constructor( initStringGroup ){
    this.insert = this.insert.bind( this );
    this.has = this.has.bind( this );
    if( initStringGroup instanceof TrieTree ){
      this.root = initStringGroup.root;
      return;
    }
    this.root = new Node( null );
    if( Array.isArray( initStringGroup ) ){
      for( let i = 0 ; i < initStringGroup.length ; i++ ){
        this.insert( initStringGroup[i] );
      }
    }
    else {
      if( initStringGroup ){
        throw new Error("initStringGroup must be an array of string");
      }
    }
  }

  insert( string ){
    if( this.has( string ) ){
      return;
    }
    var checkingNode = this.root;
    var find = false;
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          checkingNode.children[j].count++;
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        checkingNode = checkingNode.appendChild( new Node( string[i] ) );
      }
    }
  }

  remove( string ){
    var checkingNode = this.root;
    var find = false;
    var needToremove = false;
    var nodesToBeRemoved = [];
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          if( --checkingNode.children[j].count === 0 ){
            checkingNode.removeChild( checkingNode.children[j] );
          }
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        return;
      }
    }
  }

  has( string ){
    var checkingNode = this.root;
    var find = false;
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        return false;
      }
    }
    //checkingNode points to the last character
    if( checkingNode.children.length === 0 ){
      return true;
    }
    var sumCount = 0;
    for( let i = 0 ; i < checkingNode.children.length ; i++ ){
      sumCount += checkingNode;
    }
    if( checkingNode.count === sumCount + 1 )
      return true;
    else {
      return false;
    }
  }
};

export default TrieTree;
