<template>
    <div class="footer">
        <div class="ilustracao">
            <img src="../assets/linear_arte.png" alt="Ilustração">
        </div>
    </div>
</template>

<script>
export default {
  name: "FooterComponent"
};
</script>

<style scoped>
    footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }

    .ilustracao img {
        width: 100vw;  
        height: auto;
        display: block;
    }
</style>