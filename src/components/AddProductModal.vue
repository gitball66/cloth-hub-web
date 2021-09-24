<template>
  <q-dialog persistent v-model="addProductDialog">
    <q-card class="card">
      <q-card-section
        style="padding-bottom: 2px"
        class="dialog-header row justify-between"
      >
        <p class="dialog-title">Add Product</p>
        <p @click="closeModal" style="cursor: pointer" class="dialog-title">
          X
        </p>
      </q-card-section>
      <q-card-section>
        <q-input
          color="orange-4"
          standout
          v-model="name"
          type="text"
          label="Name"
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <i class="fas fa-signature"></i>
          </template>
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="description"
          type="text"
          label="Description"
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <i class="fas fa-file-alt"></i>
          </template>
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="price"
          type="number"
          label="Price (฿)"
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <i class="fas fa-tag"></i>
          </template>
        </q-input>
        <q-input
          color="orange-4"
          standout
          v-model="stock"
          type="number"
          label="Stock"
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <i class="fas fa-warehouse"></i>
          </template>
        </q-input>
        <q-file
          class="q-mb-md"
          color="orange-4"
          standout
          v-model="images"
          label="Images"
          multiple
          accept=".jpg, image/*"
          ><template v-slot:prepend> <i class="fas fa-images"></i> </template
          ><template v-slot:append>
            <q-icon
              v-if="images !== null"
              name="close"
              @click.stop="images = null"
              class="cursor-pointer" /></template
        ></q-file>
      </q-card-section>
      <q-card-actions class="row justify-center q-mb-lg">
        <q-btn
          v-if="!loadingAdd"
          @click="addProduct()"
          flat
          class="shot-btn-1"
          label="add"
          dense
        />
        <q-spinner v-else color="orange" size="2em" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: ["addProductDialog"],
  data() {
    return {
      name: null,
      description: null,
      price: null,
      stock: null,
      images: [],
      open: true,
      loadingAdd: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async addProduct() {
      this.loadingAdd = true;
      await this.$store.dispatch("addProduct", {
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        images: this.images,
      });
      this.name = null;
      this.description = null;
      this.price = null;
      this.stock = null;
      this.images = [];
      this.loadingAdd = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  background-color: #fff;
  width: 60vw;
}
</style>