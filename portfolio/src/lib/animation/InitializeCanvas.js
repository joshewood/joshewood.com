import * as PIXI from 'pixi.js'

const app = new PIXI.Application({transparent: true});
const renderer = PIXI.autoDetectRenderer();
// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('shard', 'shard.png').load((loader, resources) => {
    // This creates a texture from a 'shard.png' image
    var shards = [];

    var totalSprites = 10000;
    var sprites = new PIXI.ParticleContainer(10000, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true
    });
    app.stage.addChild(sprites);
    for (var i = 0; i < totalSprites; i++)
    {
        // create a new Sprite
        var shard = PIXI.Sprite(resources.shard.texture);

        shard.tint = Math.random() * 0xE8D4CD;

        // set the anchor point so the texture is centerd on the sprite
        shard.anchor.set(0.5);

        // different shards, different sizes
        shard.scale.set(0.8 + Math.random() * 0.3);

        // scatter them all
        shard.x = Math.random() * renderer.width;
        shard.y = Math.random() * renderer.height;

        shard.tint = Math.random() * 0x808080;

        // create a random direction in radians
        shard.direction = Math.random() * Math.PI * 2;

        // this number will be used to modify the direction of the sprite over time
        shard.turningSpeed = Math.random() - 0.8;

        // create a random speed between 0 - 2, and these shards are slooww
        shard.speed = (2 + Math.random() * 2) * 0.2;

        shard.offset = Math.random() * 100;

        // finally we push the shard into the shards array so it it can be easily accessed later
        shards.push(shard);

        sprites.addChild(shard);
    }

    // create a bounding box box for the little shards
    var shardBoundsPadding = 100;
    var shardBounds = new PIXI.Rectangle(-shardBoundsPadding,
                                        -shardBoundsPadding,
                                        renderer.width + shardBoundsPadding * 2,
                                        renderer.height + shardBoundsPadding * 2);
    // Rotate around the center
    // shard.anchor.x = 0.5;
    // shard.anchor.y = 0.5;

    // // Add the shard to the scene we are building
    // app.stage.addChild(shard);

    // Listen for frame updates
    let tick = 0;
    app.ticker.add(() => {
         // each frame we spin the shard around a bit
        shard.rotation += 0.01;
        for (var i = 0; i < shards.length; i++)
          {
              var shard = shards[i];
              shard.scale.y = 0.95 + Math.sin(tick + shard.offset) * 0.05;
              shard.direction += shard.turningSpeed * 0.01;
              shard.position.x += Math.sin(shard.direction) * (shard.speed * shard.scale.y);
              shard.position.y += Math.cos(shard.direction) * (shard.speed * shard.scale.y);
              shard.rotation = -shard.direction + Math.PI;

              // wrap the shards
              if (shard.position.x < shardBounds.x)
              {
                  shard.position.x += shardBounds.width;
              }
              else if (shard.position.x > shardBounds.x + shardBounds.width)
              {
                  shard.position.x -= shardBounds.width;
              }

              if (shard.position.y < shardBounds.y)
              {
                  shard.position.y += shardBounds.height;
              }
              else if (shard.position.y > shardBounds.y + shardBounds.height)
              {
                  shard.position.y -= shardBounds.height;
              }
          }

              tick += 0.1;

    // time to render the stage !
    //renderer.render(app.stage);
    });
});